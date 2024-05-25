import com.deque.html.axecore.results.Results;
import com.deque.html.axecore.results.Rule;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AttachmentTemplateMaker {
    private int globalCounter = 0;
    private final List<Rule> context;

    public AttachmentTemplateMaker(Results data) {
        this.context = data.getViolations();
    }

    private int incrementIndex() {
        return ++globalCounter;
    }

    public String generateTableAttachment() {
        Configuration cfg = new Configuration(Configuration.VERSION_2_3_31);
        cfg.setClassForTemplateLoading(AttachmentTemplateMaker.class, "/");
        cfg.setDefaultEncoding("UTF-8");
        cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);

        Map<String, Object> templateData = new HashMap<>();
        templateData.put("data", context);
        templateData.put("incrementIndex", new IncrementIndexMethod());

        try (StringWriter out = new StringWriter()) {
            Template template = cfg.getTemplate("tableTemplate.ftl");
            template.process(templateData, out);
            return out.getBuffer().toString();
        } catch (IOException | TemplateException e) {
            e.printStackTrace();
            return null;
        }
    }
}